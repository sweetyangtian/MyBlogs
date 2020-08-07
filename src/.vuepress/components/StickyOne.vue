<template>
  <div class="position-sticky-demo">
    <header class="banner">banner</header>
    <div class="container">
      <main></main>
      <aside></aside>
    </div>
    <footer class="footer">footer</footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
body {
  margin: 0;
}

.position-sticky-demo {
  width: 500px;
  border:2px solid #eee;
  text-align: center;
}
header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
  background: rgb(121, 187, 255);
}
footer {
  width: 100%;
  height: 400px;
  line-height:400px;
  margin: 0 auto;
 background: rgb(250, 236, 216);
}
.container {
  width: 90%;
  height: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
}
.container main {
  flex: 1;
  height: 600px;
  margin-right: 20px;
  background: rgb(233, 233, 235);
}
.container aside {
  flex: 0.2;
  height: 160px;
  background:#F56C6C;
  position: sticky;
  top: 20px;
}
</style>