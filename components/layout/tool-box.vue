<template>
  <div id="tools">
    <div class="container">
      <div class="tools-list">
        <a class="feedback" 
           :title="'邮件反馈'"
           href="mailto:troye.77@qq.com"
           target="_blank">
          <i class="iconfont icon-mail"></i>
        </a>
        <button class="to-top" 
                :title="'顶部'"
                @click="totop"
                @mouseover="setButtonState('top', true, true)"
                @mouseleave="setButtonState('top', false)">
          <i class="iconfont icon-top"></i>
        </button>
        <button class="to-bottom" 
                :title="'底部'"
                @click="toBottom" 
                @mouseover="setButtonState('bottom', true, true)"
                @mouseleave="setButtonState('bottom', false)">
          <i class="iconfont icon-bottom"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { scrollTo, Easing } from '~/utils/scroll-to-anywhere'

  export default {
    name: 'tool-box',
    data() {
      return {
        topBtnMouseOver: false,
        bottomBtnMouseOver: false,
        toggleWebrtcFn: null,
        firstOpenWeRtc: true,
        animationFrameId: null
      }
    },
    methods: {
      totop() {
        scrollTo('body', 300, { easing: Easing['ease-in'] })
      },
      toBottom() {
        scrollTo(window.scrollY + window.innerHeight, 300, { easing: Easing['ease-in'] })
      },
      setButtonState(position, state, start) {
        this[position === 'bottom' ? 'bottomBtnMouseOver' : 'topBtnMouseOver'] = state
        window.cancelAnimationFrame(this.animationFrameId)
        start && this.slowMoveToAnyWhere()
      },
      slowMoveToAnyWhere() {
        const step = () => {
          let targetScrollY = window.scrollY
          const currentScrollY = document.body.scrollHeight - window.innerHeight
          if (this.bottomBtnMouseOver) targetScrollY += 1
          if (this.topBtnMouseOver) targetScrollY -= 1
          if (targetScrollY < 0) {
            targetScrollY = 0
          } else if (targetScrollY >= currentScrollY) {
            targetScrollY = currentScrollY
          }
          const canScrollTo = targetScrollY > 0 && targetScrollY < currentScrollY
          if (!canScrollTo) {
            return false
          }
          window.scrollTo(0, targetScrollY)
          if (this.bottomBtnMouseOver || this.topBtnMouseOver) {
            this.animationFrameId = window.requestAnimationFrame(step)
          } else {
            window.cancelAnimationFrame(this.animationFrameId)
            return false
          }
        }
        this.animationFrameId = window.requestAnimationFrame(step)
      },

    }
  }
</script>

<style lang="scss" scoped>
  #tools {
    position: fixed;
    z-index: 9;
    width: 100%;
    bottom: 25rem;

    > .container {
      position: relative;

      > .tools-list {
        position: absolute;
        right: -10em;
        width: 3em;
        height: 7em;

        > .webrtc,
        > .barrage,
        > .to-top,
        > .to-bottom,
        > .feedback {
          display: block;
          width: 3em;
          height: 3em;
          line-height: 3em;
          text-align: center;
          background-color: $module-bg;

          &:hover {
            background-color: $module-hover-bg;
          }
        }

        @keyframes default-btn-bg {
          0%   {
            color: white;
            background: chartreuse;
          }
          12%  {
            color: white;
            background: green;
          }
          24%  {
            color: white;
            background: red;
          }
          36%  {
            color: white;
            background: darkviolet;
          }
          60% {
            color: white;
            background: pink;
          }
          72% {
            color: $text;
            background: yellow;
          }
          86% {
            color: $text;
            background: white;
          }
          100% {
            color: white;
            background: black;
          }
        }

        @keyframes webrtc {
          0%   {
            color: white;
            background: $primary;
          }
          100% {
            color: $primary;
            background: white;
          }
        }

        > .webrtc {
          animation: webrtc 3s infinite;

          &.active {
            animation: webrtc .5s infinite;
          }

          &.close {
            animation: none;
          }
        }

        > .barrage {
          color: white;
          animation: default-btn-bg 10s infinite;

          &.active {
            background-color: $module-hover-bg;
            animation: default-btn-bg steps(1) 1.666s infinite;
          }

          &.close {
            color: $link-color;
            animation: none;
          }
        }

        > .to-bottom {
          height: 2em;
          line-height: 2em;
        }
      }
    }
  }
</style>
