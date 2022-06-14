# sats4tips
Your own personalized space for collecting tips in Bitcoin.

This project aims to be a demonstration of utilizing the Lightning network within a web application. Feel free to re-use any code that you find!

## Features

* Lightning Login (Authentication).
* Static Pay Requests.
* Payment Withdraws.
* Individual custodial accounts.
* ~~Personal Payment Addresses (coming soon!)~~

## Tech Stack
```
Lightning Server  : LND (github link)
Account Managment : Lnbits (github link)
Application Host  : Voltage (site link)
Webserver Host    : Vercel (site link)
Web Framework     : NextJS (site link)
```
## Packages
```
react        : React framework.
next         : Next framework (uses React).
iron-session : Encrypted client-side sessions.
secp256k1    : For secp256k1 signatures.
bech32       : For bech32 (lnurl) encoding.
moment       : For extra time/date features.
qrcode       : For generating QR codes.
swr          : For managing fetch / caching responses.
```
## Getting Started

Before getting started, you will need to setup an `.env.local` file with the following:

```
SECRET_KEY=<A random base64url encoded string. Encrypts server-side data.>
SESSION_NAME=<Reference name of your site. For iron-session cookie.>
SESSION_KEY=<A random base64url encoded string. Encrypts cookie data.>
LNBITS_URL=<URL endpoint of your lnbits instance.>
LNBITS_KEY=<Master user key of your lnbits instance.>
MONGO_DBNAME=<Name of your project's mongo database.>
MONGO_DBURI=<Full mongoURI pointing towards your MongoDB instance.>
```

From there, you can start with `yarn` or `npm i` in order to install all package dependencies.

Once that is complete, you should be able to start a local instance of the project using `yarn dev` or `npm dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result!

If you would like to deploy to vercel, you can install their client using `npm i -g vercel`, then follow the prompts to setup an account and launch a preview build of your project.

## Learn More

To learn more about the technology behind this project, take a look at the following resources:

- LND documentation

- LNBits documentation

- Voltage documentation

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contribution

Feel free to fork this project and contribute to the source code! We are currently still in the process of setting up tests for all the features, and could use some help!

## Resources
