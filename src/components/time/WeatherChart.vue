
<template>
  <div  class="card">
    <section class="info-section">
      <div class="background-design">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
      <div class="left-side">
        <div class="weather">
          <div>
            <svg
                stroke="#ffffff"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
            >
              <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
              <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                    d="M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z"
                    fill="#ffffff"
                ></path>
              </g>
            </svg>
          </div>
          <div>Sunny</div>
        </div>
        <div class="temperature">36°</div>
        <div class="range">42°/28°</div>
      </div>
      <div class="right-side">
        <div>
          <div class="hour">23:56</div>
          <div class="date">MON 08-23</div>
        </div>
        <div class="city">A Coruña</div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 180px;
  width: 280px;
  border-radius: 25px;
  background: lightgrey;
  overflow: hidden;
  transition: 100ms ease;
  box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 4px;
}

/* ---------- Info section ---------- */

.info-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 75%;
  color: white;
}

.left-side {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  z-index: 1;
  padding-left: 18px;
}

button {
  display: block;
  border: none;
  background: transparent;
}

.weather {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}

.weather div {
  display: flex;
  align-items: center;
}

.weather div:nth-child(1) {
  width: 40%;
  height: auto;
}

.temperature {
  font-size: 34pt;
  font-weight: 500;
  line-height: 8%;
}

.right-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  padding-right: 18px;
  z-index: 1;
}

.right-side > div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.hour {
  font-size: 19pt;
  line-height: 1em;
}

.date {
  font-size: 15px;
}

/* ---------- Background ---------- */
.background-design {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #ec7263;
  overflow: hidden;
}

.circle {
  background-color: #efc745;
}

.circle:nth-child(1) {
  position: absolute;
  top: -80%;
  right: -50%;
  width: 300px;
  height: 300px;
  opacity: 0.4;
  border-radius: 50%;
}

.circle:nth-child(2) {
  position: absolute;
  top: -70%;
  right: -30%;
  width: 210px;
  height: 210px;
  opacity: 0.4;
  border-radius: 50%;
}

.circle:nth-child(3) {
  position: absolute;
  top: -35%;
  right: -8%;
  width: 100px;
  height: 100px;
  opacity: 1;
  border-radius: 50%;
}

/* ---------- Days section ---------- */
.days-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 25%;
  background-color: #974859;
  gap: 2px;
  box-shadow: inset 0px 2px 5px #974859;
}

.days-section button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #a75265;
  box-shadow: inset 0px 2px 5px #974859;
  cursor: pointer;
  transition: 100ms ease;
  gap: 5px;
}

.days-section button:hover {
  scale: 0.9;
  border-radius: 10px;
}

.days-section .day {
  font-size: 10pt;
  font-weight: 500;
  color: white;
  opacity: 0.7;
}

.icon-weather-day {
  display: flex;
  align-items: center;
  width: 20px;
  height: 100%;
}
</style>
<script setup lang="ts">
</script>
