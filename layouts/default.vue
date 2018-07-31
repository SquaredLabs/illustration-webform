<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
@font-face {
  font-family: "Moderat";
  src: url("~assets/fonts/Moderat-Bold.eot");
  src: url("~assets/fonts/Moderat-Bold.eot?#iefix") format("embedded-opentype"),
    url("~assets/fonts/Moderat-Bold.woff2") format("woff2"),
    url("~assets/fonts/Moderat-Bold.woff") format("woff");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "Moderat";
  src: url("~assets/fonts/Moderat-Regular.eot");
  src: url("~assets/fonts/Moderat-Regular.eot?#iefix")
      format("embedded-opentype"),
    url("~assets/fonts/Moderat-Regular.woff2") format("woff2"),
    url("~assets/fonts/Moderat-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "SpaceMono";
  src: url("~assets/fonts/SpaceMono-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "SpaceMono";
  src: url("~assets/fonts/SpaceMono-Bold.ttf");
  font-weight: bold;
  font-style: normal;
}
html {
  font-family: "Moderat";
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
