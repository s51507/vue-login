/* eslint-disable no-unused-vars */
<template>
  <div id="clock" :class="$style.main">
    <div id="h10" :class="$style.num">
      {{''}}
      <div :class="$style.upper" />{{''}}
      <div :class="[$style.base, $style.upper]" />{{''}}
      <div :class="[$style.base, $style.lower]" />{{''}}
      <div :class="$style.lower" />{{''}}
    </div>

    <div id="h0" :class="$style.num">
      {{''}}
      <div :class="$style.upper" />{{''}}
      <div :class="[$style.base, $style.upper]" />{{''}}
      <div :class="[$style.base, $style.lower]" />{{''}}
      <div :class="$style.lower" />{{''}}
    </div>

    <div :class="$style.colon">:</div>

    <div id="m10" :class="$style.num">
      {{''}}
      <div :class="$style.upper" />{{''}}
      <div :class="[$style.base, $style.upper]" />{{''}}
      <div :class="[$style.base, $style.lower]" />{{''}}
      <div :class="$style.lower" />{{''}}
    </div>

    <div id="m0" :class="$style.num">
      {{''}}
      <div :class="$style.upper" />{{''}}
      <div :class="[$style.base, $style.upper]" />{{''}}
      <div :class="[$style.base, $style.lower]" />{{''}}
      <div :class="$style.lower" />{{''}}
    </div>

    <div :class="$style.colon">:</div>

    <div id="s10" :class="$style.num">
      {{''}}
      <div :class="$style.upper" />{{''}}
      <div :class="[$style.base, $style.upper]" />{{''}}
      <div :class="[$style.base, $style.lower]" />{{''}}
      <div :class="$style.lower" />{{''}}
    </div>

    <div id="s0" :class="$style.num">
      {{''}}
      <div :class="$style.upper" />{{''}}
      <div :class="[$style.base, $style.upper]" />{{''}}
      <div :class="[$style.base, $style.lower]" />{{''}}
      <div :class="$style.lower" />{{''}}
    </div>
  </div>

</template>

<script>
import { TweenMax, Bounce, Power1, Power4 } from 'gsap'

export default {
  methods: {
    test () {
      // set 3d transforms
      TweenMax.set(this.$style.main, { perspective: 1500, scale: 0.7125 })
      TweenMax.set(this.$style.upper, { rotationX: 0.01, transformOrigin: '50% 100%' })
      TweenMax.set(this.$style.lower, { rotationX: 0.01, transformOrigin: '50% 0%' })
      const h10 = document.getElementById('h10')
      const h0 = document.getElementById('h0')
      const m10 = document.getElementById('m10')
      const m0 = document.getElementById('m0')
      const s10 = document.getElementById('s10')
      const s0 = document.getElementById('s0')

      // set clock
      var t, ss, mm, hh
      setTimeVars()
      function setTimeVars () {
        t = new Date()
        t = new Date()
        ss = String(t.getSeconds())
        mm = String(t.getMinutes())
        hh = String((t.getHours() > 12) ? t.getHours() - 12 : t.getHours())
        if (ss.length === 1) ss = '0' + ss
        if (mm.length === 1) mm = '0' + mm
        if (hh.length === 1) hh = '0' + hh
      }

      h10.childNodes[3].innerHTML = h10.childNodes[7].innerHTML = '<span>' + Number(hh.substr(0, 1)) + '</span>'
      h0.childNodes[3].innerHTML = h0.childNodes[7].innerHTML = '<span>' + Number(String(hh).substr(1, 1)) + '</span>'

      m10.childNodes[3].innerHTML = m10.childNodes[7].innerHTML = '<span>' + Number(mm.substr(0, 1)) + '</span>'
      m0.childNodes[3].innerHTML = m0.childNodes[7].innerHTML = '<span>' + Number(mm.substr(1, 1)) + '</span>'

      s10.childNodes[3].innerHTML = s10.childNodes[7].innerHTML = '<span>' + Number(ss.substr(0, 1)) + '</span>'
      s0.childNodes[3].innerHTML = s0.childNodes[7].innerHTML = '<span>' + Number(ss.substr(1, 1)) + '</span>'

      // start ticking
      // eslint-disable-next-line no-unused-vars
      var interval = setInterval(function () {
        setTimeVars()
        tick(s0, Number(ss.substr(1, 1)))

        if (ss.substr(1, 1) === '9') {
          tick(s10, Number(ss.substr(0, 1)))
          if (ss === '59') {
            tick(s10, 5, true)
            tick(m0, Number(mm.substr(1, 1)))
            if (mm.substr(1, 1) === '9') {
              tick(m10, Number(mm.substr(0, 1)))
              if (mm === '59') {
                tick(m10, 5, true)
                tick(h0, Number(hh.substr(1, 1)))
                if (hh.substr(1, 1) === '9') tick(h10, Number(hh.substr(0, 1)))
                if (hh === '12') {
                  tick(h0, Number(hh.substr(0, 1)), true)
                  tick(h10, Number(hh.substr(1, 1)), true)
                }
              }
            }
          }
        }
      }, 1000)

      function tick (mc, i, toZero = false) {
        // set numbers
        mc.childNodes[3].innerHTML = '<span>' + i + '</span>' // start upper
        mc.childNodes[5].innerHTML = '<span>' + i + '</span>' // start lower
        if (i === 9 || toZero) i = -1
        mc.childNodes[1].innerHTML = '<span>' + (i + 1) + '</span>' // end upper
        mc.childNodes[7].innerHTML = '<span>' + (i + 1) + '</span>' // end lower
        // animate tick
        TweenMax.fromTo(mc.childNodes[1], 0.3, { alpha: 0 }, { alpha: 1, ease: Power4.easeIn })
        TweenMax.fromTo(mc.childNodes[3], 0.3, { rotationX: 0, background: 'linear-gradient(0deg, rgba(200,200,200,1), rgba(255,255,255,1) 15%)' }, { rotationX: -90, ease: Power1.easeIn })
        TweenMax.fromTo(mc.childNodes[7], 0.5 + 0.2 * Math.random(), { rotationX: 90 }, { rotationX: 0, ease: Bounce.easeOut, delay: 0.3 })
        TweenMax.fromTo(mc.childNodes[5], 0.6, { alpha: 1 }, { alpha: 0, ease: Bounce.easeOut, delay: 0.3 })
      }
    }
  },
  mounted () {
    this.test()
  }
}
</script>

<style lang="scss" module>

@import url('https://fonts.googleapis.com/css?family=Roboto+Slab');

html, body { width:100%; height:100%; margin:0; padding:0; background:#141414; }

.main {
  position: absolute;
  top:0; bottom:0; left:50%; right:0;
  margin:auto;
  margin-left:-465px;
  width:930px;
  height:200px;
  text-align:center;
}

.num {
  position:relative;
  display:inline-block;
  width:140px;
  height:200px;
  font: 140px 'Roboto Slab', sans-serif;
  color:#404040;
  background:rgba(90,90,90,1);
  border:solid 3px #404040;
  box-sizing:border-box;
  border-radius:18px;
}

.colon {
  position:relative;
  display:inline-block;
  font: 140px 'Roboto Slab', sans-serif;
  top:-60px;
  left:-2px;
  color:#404040;
}

.base span {
  position:absolute;
  display:block;
  width:100%;
}

.upper {
  position:absolute;
  width:100%;
  height:50%;
  background:linear-gradient(0deg, rgba(200,200,200,1), rgba(255,255,255,1) 15%);
  border-radius:15px 15px 0 0;
  box-shadow: inset 0 1px 8px rgba(0,0,0,.1);
  overflow:hidden;
  border-bottom:solid 1px rgba(0,0,0,.5);
  box-sizing:border-box;
}

.lower {
  position:absolute;
  top:50%;
  width:100%;
  height:50%;
  background:linear-gradient(180deg, rgba(200,200,200,1), rgba(255,255,255,1) 15%);
  border-radius:0 0 15px 15px;
  box-shadow: inset 0 -3px 5px rgba(0,0,0,.2);
  overflow:hidden;
  border-top:solid 1px #ddd;
  box-sizing:border-box;
}

.lower span {
  position:relative;
  top:-100%;
}
</style>
