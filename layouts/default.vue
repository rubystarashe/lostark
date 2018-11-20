<template>
  <div v-show="$store.state.server">
    <div class="bg"/>
    <div class="logo">
      디스코드<br>루비스타#4609
    </div>
    <nuxt v-if="$store.state.server" class="page_area"/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');

body {
  margin: 0 0 0 0;
  font-family: 'Nanum Gothic', sans-serif;
}

.bg {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: url('~static/bg.jpg');
  background-position:50% 50%;  /* Sets reference point to scale from */
  background-size:cover;
  animation: brightness 1.0s;
  filter: brightness(1.25);
}
.logo {
  position: fixed;
  right: 0%;
  top: 0%;
  text-align: right;
  animation: brightness 1.0s;
  color: rgba(255, 255, 255, 0.5);
  font-size: calc(1vh + 1vw);
  text-shadow: -1px 0 rgba(50, 50, 150, 0.3), 0 1px rgba(50, 50, 150, 0.3), 1px 0 rgba(50, 50, 150, 0.3), 0 -1px rgba(50, 50, 150, 0.3);
}
.page_area {
  position: fixed;
  display: table;
  opacity: 0;
  animation: brightness 1.0s forwards;
  animation-delay: 0.5s;
}

@keyframes brightness {
  0%  {
    filter: brightness(10);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
