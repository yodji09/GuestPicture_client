<template>
  <div class="home" style=""> {{ canvasId }}
    <div>
      <paintable
      alwaysOnTop
      :active="isActive"
      :width="800"
      :height="800"
      :disableNavigation="disableNavigation"
      :hide="hidePaintable"
      :horizontalNavigation="false"
      :name="isFirstPaintable ? 'myscreen' : 'mysecondscreen'"
      :factor="1"
      :lineWidth="dynamicLineWidth"
      :lineWidthEraser="10"
      :useEraser="useEraser"
      :color="color"
      class="paint"
      ref="paintable"
      >
      </paintable>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'canvasPaintableClient',
  props: ['canvasId'],
  components: {
  },
  data () {
    return {
      testnum: 1,
      isActive: false,
      disableNavigation: true,
      hidePaintable: false,
      useEraser: false,
      color: '#999999',
      isFirstPaintable: true,
      dynamicLineWidth: 4
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.paint {
  width: 40vw !important;
  height: 85vh !important;
  background-color:#c7ffcc;
  border-radius: 5px;
  box-sizing: border-box;
  display: block;
  position: relative !important;
  overflow: hidden;
  margin-left: 200px;
}
</style>
