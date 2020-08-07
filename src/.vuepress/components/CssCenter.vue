<template>
  <div class="css-center-demo">
      <p> 1. 容器内</p>
     
      <div class="container">
          <div class="child">
              <p>这是一行文字</p>
              <p>这是一行文字这是一行文字这是一行文字这是一行文字</p>
               
          </div>
      </div>
      <p> 2. 内容块一直停留在可视区域内</p>
      <div class="container">
          <div class="child is-Fixed">
              <p>这是一行文字</p>
              <p>这是一行文字这是一行文字这是一行文字这是一行文字</p>
               
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss"  scoped>
.css-center-demo {
    

    
}
</style>