# SvelteKit eCommerce Store with MedusaJS

Storefront is built with Sveltekit/Typescript, with Stripe as the payment provider.

>[Medusa](https://www.medusajs.com/) is a set of commerce modules and tools that allow you to build rich, reliable, and performant commerce applications without reinventing core commerce logic. The modules can be customized and used to build advanced ecommerce stores, marketplaces, or any product that needs foundational commerce primitives. All modules are open-source and freely available on npm.

## Installing packages

```bash
cd my-app
yarn install
```

## Configuring the store

```bash
mv .env.example .env
```
- Install and configure [Medusa Backend](https://docs.medusajs.com/development/backend/install) and Admin. Install Medusa's [Stripe plugin](https://docs.medusajs.com/plugins/payment/stripe).
- Make sure to add http://localhost:5173 to your STORE_CORS in medusa-config.js in your medusa project folder.

## Running the app

```bash
yarn dev
```
