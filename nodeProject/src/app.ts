import * as express from 'express';
import { IncomingHttpHeaders } from 'http';
const jwt = require('jsonwebtoken');
import { createSchema, createYoga } from 'graphql-yoga';
var { buildSchema } = require("graphql")
const { loadSchemaSync } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
import resolvers from './resolver'; // Your resolvers
import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const cors = require('cors');
// const {
//   GraphQLUpload,
//   graphqlUploadExpress, // A Koa implementation is also exported.
// } = require('graphql-upload');

const SECRET_KEY = '4dc11987-6651-49b3-9818-18e704f489a3';

const app = express();
app.use(cors());
const typeDefs = loadSchemaSync("src/graphql/schema.graphql", { loaders: [new GraphQLFileLoader()] })
// app.use(graphqlUploadExpress());

interface AuthenticatedRequest extends express.Request {
  userId?: number; // Custom property for storing authenticated userId
  headers: IncomingHttpHeaders & {
    authorization?: string;
  };
}

const authenticate = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];
    try {
      const decoded: any = jwt.verify(token, SECRET_KEY);
      req.userId = decoded.userId;
    } catch (error) {
      // Handle token verification errors
    }
  }
  next();
};

app.use('/graphql', createYoga({ schema: createSchema({ typeDefs, resolvers}), context: { auth: "Hello" }}));

app.use(express.json());

app.post('/create-account', async (req: express.Request,res: express.Response) => {
  const { email, phone, pdfOrImg, faceImage, address, accountType, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = await prisma.account.create({
      data: {
        email,
        phone,
        pdfOrImg,
        faceImage,
        address,
        aml: false,
        kyc: false,
        accountType,
        passwordHash: hashedPassword,
      },
    });

    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Account creation failed.' });
  }
});

app.get('/accounts', async (req: express.Request,res: express.Response) => {
  res.json(await prisma.account.findMany())
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email)

  const user = await prisma.account.findUnique({
    where: { email }
  });

  if (!user) return res.sendStatus(401);

  // const validPassword = await bcrypt.compare(password, user.passwordHash);
  // if (!validPassword) return res.sendStatus(401);

  const accessToken = jwt.sign({ userId: user.id }, SECRET_KEY);
  res.json({ accessToken, userid:user.id, });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});