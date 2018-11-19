<template>
<section class="container">
  <div class="info">
    <div class="box">
      <div class="item" v-for="{ name, queue = '알 수 없음'} in server" :key="name">
        <span class="data name">{{name}}</span>
        <span class="data queue">{{queue}}</span>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      server: 'getServer',
      serverStatus: 'getServerStatus'
    })
  },
  mounted() {
    setTimeout(() => {
      this.$message({
        message: this.serverStatus ? '서버 On! 실시간으로 대기 순위를 확인할 수 있습니다!' : '현재 서버가 꺼져있습니다. 디스코드 루비스타#4609 로 말씀해 주세요',
        type: this.serverStatus ? 'success' : 'warning'
      })
      this.$notify({
        title: '알 수 없는 서버 문제점',
        message: this.$createElement('i', { style: 'color: teal' }, '제 캐릭터가 존재하지 않는 서버는 갱신이 불가능하기 때문에, 캐릭터가 만들어지기 전까지는 이용이 불가능합니다.'),
        position: 'bottom-right',
        duration: 0
      })
    }, 1000)
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  text-align: center;
}
.info {
  display: table-cell;
  vertical-align: middle;
}
.box {
  max-width: 30vh;
  min-width: 30vw;
  padding: 3vh;
  margin: auto;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}
.item {
  margin: calc(1.1vh + 1.1vw);
  font-size: calc(1.2vh + 1.2vw);
}
.data {
  text-shadow: 0.1vw 0.1vh 0.1vw black;
}
.name {
  float: left;
  text-align: left;
  width: 50%;
  color: white;
}
.queue {
  width: 50%;
  color: yellow;
}
</style>
