<p align="center">
    <i>🚀 <a href="https://keycloakify.dev">Angular + Vite Keycloakify</a> v11 starter 🚀</i>
    <br/>
    <br/>
</p>

This starter is based on Vite and Angular. There is also [a Webpack based starter](https://github.com/keycloakify/keycloakify-starter-angular).

# Quick start

```bash
git clone https://github.com/keycloakify/keycloakify-starter-angular-vite
cd keycloakify-starter-angular-vite
yarn install # Or use an other package manager, just be sure to delete the yarn.lock if you use another package manager.
```

# Testing the theme locally

[Documentation](https://docs.keycloakify.dev/testing-your-theme)

# How to customize the theme

[Documentation](https://docs.keycloakify.dev/customization-strategies)

# Building the theme

You need to have [Maven](https://maven.apache.org/) installed to build the theme (Maven >= 3.1.1, Java >= 7).  
The `mvn` command must be in the $PATH.

- On macOS: `brew install maven`
- On Debian/Ubuntu: `sudo apt-get install maven`
- On Windows: `choco install openjdk` and `choco install maven` (Or download from [here](https://maven.apache.org/download.cgi))

```bash
npm run build-keycloak-theme
```

Note that by default Keycloakify generates multiple .jar files for different versions of Keycloak.  
You can customize this behavior, see documentation [here](https://docs.keycloakify.dev/targeting-specific-keycloak-versions).

# Initializing the account theme

```bash
npx keycloakify initialize-account-theme
```

# Initializing the email theme

```bash
npx keycloakify initialize-email-theme
```

# Issue Description

When importing images from the `login/assets` directory within styles (e.g., CSS or SCSS) of a component, running `npm run build-keycloak-theme` fails to build the package.
This is caused by the postBuild configuration in `vite.config.ts`, which starts scanning dependencies from `login/assets`, but fails to find them, resulting in an incomplete build. There is currently no way to bypass this step or force the build to ignore these missing assets.

### Steps to Reproduce
1. Import an image from login/assets in the style block of any component:
```css
.test-class {
  background-image: url('login/assets/kc-logo.png'); 
}
```
2. Run the build script:
```bash
npm run build-keycloak-theme
```
3. During the build, the `postBuild` logic in `vite.config.ts` tries to scan dependencies.

4. The build process fails because it cannot resolve dependencies from login/assets.
