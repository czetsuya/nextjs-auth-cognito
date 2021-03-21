import { createGetServerSideAuth, createUseAuth } from "aws-cognito-next";
import pems from "../../pems.json"

// create functions by passing pems
export const getServerSideAuth = createGetServerSideAuth({ pems });
export const useAuth = createUseAuth({ pems });

// reexport functions from aws-cognito-next
export * from "aws-cognito-next";