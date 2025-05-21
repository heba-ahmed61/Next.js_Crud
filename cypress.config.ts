// import { defineConfig } from "cypress";
// import { addPost } from "./app/actions/serverActions";

// export default defineConfig({
//   e2e: {
//     baseUrl:'http://localhost:3000',
//     setupNodeEvents(on, config) {
//      on('task',{
//       'addItem': (item) => {
//         addPost(item).then(() => null)
//       }
//      })
//     },
//   },
// });

import { defineConfig } from "cypress";
import { addPost } from "./app/actions/serverActions";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        // addItem(item) {
        //   return addPost(item).then(() => null); // Ensure to return the promise
        // },
        'addItem': (item) => {
          return addPost(item).then(()=> null)
        }
      });
    },
  },
  env:{
    envVariable:'env variable'
  }
});
