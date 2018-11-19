<template>
  <div v-show="$store.state.server">
    <div class="bg"/>
    <div class="logo">
      <div class="a">Rubystar Ashe's</div>
      <div class="b">Lost Ark Queue checker</div>
    </div>
    <nuxt v-if="$store.state.server" class="page_area"/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');
@import url('https://fonts.googleapis.com/css?family=Indie+Flower');

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
  background: url('/bg.jpg');
  background-position:50% 50%;  /* Sets reference point to scale from */
  background-size:cover;
  animation: brightness 1.0s;
  filter: brightness(1.25);
}
.logo {
  position: fixed;
  transform: rotate(-35deg);
  left: 10%;
  top: 15%;
  text-align: center;
  animation: brightness 1.0s;
  color: white;
  opacity: 0.5;
  font-family: 'Indie Flower', cursive;
}
.a {
  font-size: calc(3vw + 3vh);
}
.b {
  font-size: calc(2vw + 2vh);
}
.page_area {
  position: fixed;
  display: table;
  animation: brightness 1.0s;
}

@keyframes brightness {
  0%  {
    filter: brightness(10);
    opacity: 0;
  }
}

</style>
