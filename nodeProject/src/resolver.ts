import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from './storage';

interface UploadResult {
  url: string;
  uploadUrl: string;
  // Other properties if applicable
}

const resolvers: any = {
  Query: {
    users: async (_:any, args:any, context : { auth: String }) => {
      // console.log(context.auth)
      return await prisma.account.findMany();
    },
    userById:async (_:any, args:any, context : { auth: String }) => {
      const { id } = args;
      const user = await prisma.account.findUnique({
        where: { id },
      });
      return user;
    }
  },
  Mutation: {
    createAccount: async (_:any, args:any) => {
      try {
        const hashedPassword = await bcrypt.hash(args.input.password, 10);
        delete args.input.password
        const existingUser = await prisma.account.findUnique({
          where: { email:args.input.email },
        });
        if (existingUser) {
          console.debug('User with this email already exists');
          return existingUser;
        }
        const uniqueId: string = uuidv4();
        let temp = args.input.pdfOrImg.split('.')
        temp = temp[temp.length - 1]
        let cred : UploadResult = await uploadFile("credentials", `${uniqueId}.${temp}`) as UploadResult;
        let credUrl = cred.uploadUrl
        args.input.pdfOrImg = cred.url
        temp = args.input.faceImage.split('.')
        temp = temp[temp.length - 1]
        cred = await uploadFile("face", `${uniqueId}.${temp}`) as UploadResult;
        let faceUrl = cred.uploadUrl
        args.input.faceImage = cred.url
        const newAccount = await prisma.account.create({
          data: {
            ...args.input,
            aml: false,
            kyc: false,
            passwordHash: hashedPassword,
          },
        });

        return {...newAccount, faceUrl, credUrl}; // Make sure this is a non-null value
      } catch (error) {
        // Handle errors here
        console.error(error)
        throw new Error('Account creation failed.'); // Or return a more informative error
      }
    },
  },
};

export default resolvers;
