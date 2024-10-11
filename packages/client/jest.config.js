/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
    globals: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
};
