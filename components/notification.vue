<template>
<section class="notification" v-if="remain">
  <div class="servern">{{data.name}}</div>
  <div class="nowq">{{nowqueue === '알 수 없음' || nowqueue === '접속 가능' ? nowqueue : '지금 시작하면 ' + nowqueue + '번째 대기자'}}</div>
  <div class="titlen">아래에 현재 대기순위를 입력하시면 예상 접속시간을 알려드립니다!</div>
  <div class="alarm" v-if="this.permission === 'granted'">* 예상시간 60분, 30분 전에 알람으로 알려줍니다 *</div>
  <div class="i_area"><el-input-number class="input" v-model="data.queue" :step="1000"/></div>
  <div class="end">예상 완료 시간 : {{endtime.pm}} {{endtime.hour}}시 {{endtime.min}}분</div>
  <div class="remain">{{remain.hour}}시간 {{remain.min}}분 {{remain.sec}}초 남음</div>
  <div class="todo" v-if="!(remain.hour === 0 && remain.min === 0 && remain.sec === 0)">* {{todo}} *</div>
  <div><el-button class="reset" type="warning" plain @click="data.queue = nowqueue">알람 초기화</el-button></div>
</section>
</template>

<script>
export default {
  props: [
    'data',
    'server'
  ],
  computed: {
    permission () {
      try {
      return Notification.permission
      } catch(e) {return null}
    },
    nowqueue () {
      const queue = this.server.find(e => e.name === this.data.name).queue
      return this.data.queue !== '알 수 없음' && this.data.queue !== '접속 가능' ? queue : this.data.queue
    },
    endtime () {
      const hour = this.end.getHours()
      const pm = hour > 12 ? '오후' : '오전'
      return {
        pm,
        hour: pm === '오후' ? hour - 12 : hour,
        min: this.end.getMinutes()
      }
    },
    todo () {
      const remain = this.remain || {}
      const min = remain.hour * 60 + remain.min
      let index = Math.floor(min / 15)
      if (index < 0) index = 0
      const list = [
        '화장실 해피타임 가능',
        '편의점 갔다오기 가능',
        '방청소 가능',
        '식사 가능',
        '간단한 운동 가능',
        '고급 해피타임 가능',
        '근처 손세차 가능',
        '식사 후 음주 가능',
        '코인 세탁방 이용가능',
        '직접 장보고 요리후 식사가능',
        '영화 시청 가능',
        '히오스 가능'
      ]
      return list[index] || '오늘은 글렀습니다. 꿈나라 가즈아'
    }
  },
  data() {
    return {
      end: null,
      remain: null,
      handler: null
    }
  },
  mounted() {
    try {
    Notification.requestPermission(status => {
      if (Notification.permission !== status) Notification.permission = status
    })
    } catch(e) {}
  },
  methods: {
    notification (mes) {
      try {
      if (this.permission === 'granted') {
        new Notification(mes)
      }
      }catch(e){}
    }
  },
  watch: {
    permission: {
      handler: function (n, p) {
        if (!this.handler) this.handler = setInterval(() => {
          let remain = this.end.getTime() - new Date().getTime() || {}
          if (remain < 0) remain = 0
          let hour = Math.floor(remain / 60 / 60 / 1000)
          let min = Math.floor((remain - (hour * 60 * 60 * 1000)) / 60 / 1000)
          let sec = Math.floor((remain - (hour * 60 * 60 * 1000) - (min * 60 * 1000)) / 1000)
          if (hour < 0) hour = 0
          if (min < 0) min = 0
          if (sec < 0) sec = 0
          this.remain = {
            hour,
            min,
            sec
          }
        }, 100)
      },
      immediate: true
    },
    'data.queue': {
      handler: function (n, p) {
        const min = n / 100
        const time = min * 60 * 1000
        const date = new Date(new Date().getTime() + time)
        this.end = date
      },
      immediate: true
    },
    remain: {
      handler: function (n, p) {
        if (p) {
          if (p.hour !== n.hour && n.hour === 0) this.notification('6000명 정도 남았겠네요. 확인해 보시고 오차가 있다면 수정해 주세요!')
          if (p.min !== n.min && n.hour === 0 && n.min === 29) this.notification('3000명 정도 남았겠네요. 확인해 보시고 오차가 있다면 수정해 주세요!')
          if (n.hour === 0 && n.min === 0 && n.sec !== p.sec && n.sec === 0) this.notification('예상 시간이 되었습니다! 접속을 확인해 보세요')
        }
      },
      deep: true
    }
  },
  beforeDestroy() {
    if (this.hander) {
      clearInterval(this.handler)
    }
  }
}
</script>

<style>
.notification {
  position: fixed;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  width: calc(30vh + 30vw);
  max-width: 90vw;
  background: rgba(50, 50, 80, 0.9);
  border-radius: calc(1vh + 1vw);
  color: white;
  padding: calc(1vh + 1vw);
}
.servern {
  font-size: calc(3vh + 1.5vw);
  padding-bottom: calc(0.5vh + 0.5vw);
  color: orange;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.nowq {
  font-size: calc(1.7vh + 0.8vw);
  color: gold;
}
.titlen {
  word-break: keep-all;
  font-size: calc(1vh + 1vw);
  padding: calc(1vh + 1vw);
  padding-bottom: calc(0.5vh + 0.5vw);
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.alarm {
  word-break: keep-all;
  font-size: calc(0.8vh + 0.8vw);
  padding-bottom: calc(1.3vh + 1.3vw);
  opacity: 0.8;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.i_area {
  padding-bottom: calc(1.3vh + 1.3vw);
}
.input {
  min-width: 30vh;
  transform: scale(1.3)
}
.end {
  font-size: calc(0.9vh + 0.9vw);
  color: hotpink;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.remain {
  font-size: calc(1.3vh + 1.3vw);
  color: aquamarine;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  padding: calc(0.6vh + 0.6vw);
}
.todo {
  font-size: calc(1vh + 1vw);
  color: tomato;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  padding-bottom: calc(0.6vh + 0.6vw);
}
.reset {
  width: calc(7vh + 7vw);
  min-width: 20vh;
  height: calc(4vh + 4vw);
  max-height: 6vh;
  font-size: calc(1.3vh + 1.3vh);
}
</style>