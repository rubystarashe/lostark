<template>
<section class="container">
  <div class="status" :style="{color: serverStatus ? 'green' : 'gray'}">{{serverStatus ? '봇 서버 On' : '봇 서버 Off'}}</div>
  <div class="date" v-if="updated">
    <div class="last">Last updated</div>
    <div class="now">
      <transition-component :data="pam"/>
      <transition-component :data="hour"/>시
      <transition-component :data="minutes"/>분
      <transition-component :data="seconds"/>초
    </div>
    <div class="dayName"><transition-component :data="dayName"/>요일</div>
    <div class="day">
      <transition-component :data="month"/>월
      <transition-component :data="day"/>일
    </div>
  </div>
  <div class="info">
    <div class="box">
      <div class="item" v-for="{ name, queue = '알 수 없음'} in server" :key="name">
        <span class="data name">{{name}}</span>
        <span class="data queue" :style="{
          opacity: queue === '알 수 없음' ? 0.7 : 1,
          color: queue === '알 수 없음' ? 'rgb(200, 200, 200)' : queue === '접속 가능' ? 'chartreuse' : 'yellow'
          }">{{queue}}</span>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { mapGetters } from 'vuex'

import transitionComponent from '~/components/transition'

export default {
  components: {
    transitionComponent
  },
  computed: {
    ...mapGetters({
      updated: 'getUpdated',
      server: 'getServer',
      serverStatus: 'getServerStatus'
    }),
    date () {
      return new Date(this.updated)
    },
    month () {
      return [this.date.getMonth() + 1]
    },
    day () {
      return [this.date.getDate()]
    },
    dayName () {
      const week = ['일', '월', '화', '수', '목', '금', '토']
      return [week[this.date.getDay()]]
    },
    pam () {
      return [this.date.getHours() + 1 > 12 ? '오후' : '오전']
    },
    hour () {
      const hour = this.date.getHours()
      return [hour > 12 ? hour - 12 : hour]
    },
    minutes () {
      const minutes = this.date.getMinutes()
      return [minutes < 10 ? '0' + minutes : minutes]
    },
    seconds () {
      const seconds = this.date.getSeconds()
      return [seconds < 10 ? '0' + seconds : seconds]
    }
  },
  mounted() {
    setTimeout(() => {
      this.$message({
        message: this.serverStatus ? '봇 서버 On! 실시간으로 대기 순위를 확인할 수 있습니다!' : '현재 봇 서버가 꺼져있습니다. 디스코드 루비스타#4609 로 말씀해 주세요',
        type: this.serverStatus ? 'success' : 'warning'
      })
      this.$notify({
        title: '디스코드 봇',
        dangerouslyUseHTMLString: true,
        message: '<a href="https://discordapp.com/api/oauth2/authorize?client_id=514053555682934790&scope=bot&permissions=3570752" target="_blank">눌러서 추가해 주세요!</a><br>현재 지원되는 명령어: !대기열',
        position: 'bottom-right',
        duration: 0
      })
      setTimeout(() => {
        this.$notify({
          title: '알 수 없음 문제점',
          message: this.$createElement('i', { style: 'color: teal' }, '제 캐릭터가 존재하지 않는 서버는 갱신이 불가능하기 때문에, 캐릭터가 만들어지기 전까지는 이용이 불가능합니다.'),
          position: 'bottom-right',
          duration: 0
        })
      }, 100)
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
.date {
  position: fixed;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  left: 0;
  right: 0;
  margin: auto;
  top: 4vh;
}
.last {
  font-size: calc(0.7vh + 0.7vw);
  padding-bottom: 0.7vh;
}
.now {
  font-size: calc(1.2vh + 1.2vw);
}
.day {
  font-size: calc(1.5vh + 1.5vw);
  }
.dayName {
  font-size: calc(4.5vh + 4.5vw);
}
.info {
  position: relative;
  display: table-cell;
  vertical-align: middle;
}
.box {
  z-index: 9999;
  max-width: 30vh;
  min-width: 30vw;
  padding: 3vh;
  margin: auto;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}
.status {
  position: fixed;
  text-shadow: -1px 0 rgba(255, 255, 255, 1), 0 1px rgba(255, 255, 255, 1), 1px 0 rgba(255, 255, 255, 1), 0 -1px rgba(255, 255, 255, 1);
  font-size: calc(0.8vh + 0.8vw);
  font-weight: bold;
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
