/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
    globals: {
        __SERVER_PORT__: process.env.SERVER_PORT,
        __EXTERNAL_SERVER_URL__: process.env.EXTERNAL_SERVER_URL,
        __INTERNAL_SERVER_URL__: process.env.INTERNAL_SERVER_URL,
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^@/(.*)$": "<rootDir>/src/$1",
    },
};
