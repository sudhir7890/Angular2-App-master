#Angular 2 TypeScript Application

To run the application, 

1. Download the project
2. Install Node-JS NPM on Windows/MAC
3. To check if NPM is installed properly do npm -version from command line
4. change your directory to the project directory
5. run npm install
6. Once npm install is succeded do npm start from the project directory
6a) If npm start gives any typescript errors like
    node_modules/@angular/common/src/directives/ng_class.d.ts(72,35): error TS2304: Cannot find name 'Set'
    then run sudo typings install dt~es6-shim --save --global(MAC)
    run typings install dt~es6-shim --save --global(Windows)
7. Access the app at http://localhost:3000


Happy Coding!!!!