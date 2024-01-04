# React + TypeScript + Vite(SWC)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

To start development server:

```
yarn run dev
```

Next, open your browser and visit http://localhost:5173/. The default React project will be running on port 5173.

## Notes:

- **Vite:** Frontend build tool that serves your source files over native ES modules, with rich features and fast _Hot Module Replacement (HMR)_. _Vite_ is fast because it doesn't bundle your code at all. It leverages the native support for ESM (ECMAScript Modules) of modern browsers. It sends your file directly without being bundled
- **@vitejs/plugin-react-swc:** This speeds up your Vite dev server with [SWC](https://swc.rs/) _(~20x faster than Babel)_
- **ESLint and Prettier:** For linting and pretty-printing JavaScript code respectively
- **Jest and @testing-library/react:** for unit testing
- **SWC (@swc/jest)(Used in NextJS):** So, while Vite takes advantage of ESM, Jest uses _CommonJS_ (it actually has experiment support for _Native ESM_ but it’s not 100% ready as of March '22). So the safe option is to just compile _ESM_ to _CommonJS_, which is what this tool does and does it faster that Babel and Vitest
- **jest-watch-typeahead:** _Jest_ dev tool: Filter your tests by file name or test name. [jest-watch-typeahead](https://www.npmjs.com/package/jest-watch-typeahead)

## Resources

- [How to set up a react project with vite](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-vite)
- [Adding eslint and prettier to a vitejs react project](https://dev.to/marcosdiasdev/adding-eslint-and-prettier-to-a-vitejs-react-project-2kkj)
- [Setup Jest with Vite (featuring SWC)](https://hung.dev/posts/jest-vite)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
