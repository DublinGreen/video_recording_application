<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <section class="container-fluid">
    <header class="col-md-12" id="navigation">
      <v-app-bar title="Application bar" id="navigation-bar">
      <header class="logo-box">
        <RouterLink to="/">
          <img alt="logo" width="60px" class="logo" src="@/assets/logo2.png" />
          <em class="logo-text">Adilo</em>
        </RouterLink>
      </header>
      <nav class="top-links">
        <RouterLink to="/about">Projects</RouterLink>
        <RouterLink to="/" class="a-active">Tools & App <i class="bi bi-chevron-down"></i></RouterLink>
        <RouterLink to="/">Channels</RouterLink>
        <RouterLink to="/">Contacts</RouterLink>
        <RouterLink to="/">Analytics</RouterLink>
        <RouterLink to="/">Settings</RouterLink>

        <section style="margin-top: -10px;margin-left: 250px;border-right: 2px solid #c0c0c0;height: 50px;padding-top: 10px;">
          <RouterLink to="/" class="a-active">Help</RouterLink> 
        </section>
        
        <RouterLink to="/about" style="margin-top: -30px;">
          <img alt="Avatar" width="70" height="70" class="logo" src="@/assets/profile_pic.png" />
          <span style="padding-left: 10px;margin-top: -60px;margin-left: 60px; height: 50px; display:block; ">
            <strong>Cody Fisher</strong><br>
            <em style="font-size: 0.9em">codyfisher@gmail.com</em>
          </span>
        </RouterLink>
      </nav>
    </v-app-bar>
    </header>
    <section class="col-md-12 content-box">
      <nav class="col-md-2 side-navigation">
        <RouterLink class="side-links" to="/"><i class="bi bi-camera-video"></i> <em>My Recording</em></RouterLink><br>
        <RouterLink class="side-links-not-active" to="/"><i class="bi bi-share"></i> <em>Requested</em></RouterLink>
      </nav>
      <section class="col-md-10 main-content">
        <v-main class="d-flex align-center justify-center router-view">
          <RouterView />
        </v-main>
      </section>
    </section>
  </section>
</template>

<style scoped lang="less">

.router-view{
  margin-top: 50px;
  display:block;
  min-height: 1000px;
}

#navigation{
  margin-top: -30px;
}

.side-links em{
  font-weight: bold;
  font: normal normal 300 16px/25px Poppins;
  padding-left: 10px;
}

.side-links-not-active em{
  font-weight: bold;
  font: normal normal 300 16px/25px Poppins;
  padding-left: 10px;
}

.side-links-not-active{
  text-align: left;
  font: normal normal 500 16px/25px Poppins;
  font-size:2em;
  letter-spacing: 0px;
  color: #000;
  font-weight: bold;
  padding-left: 30px;
  padding-top: 10px;
  display: block;
}

.side-links{
  padding-left: 30px;
  padding-top: 10px;
  display: block;
  height: 50px;
  background: #E2E5ED 0% 0% no-repeat padding-box;
  border: 1px solid #0DABD838;
  border-radius: 10px;
  opacity: 1;
  width: 100%;
  text-align: left;
  font: normal normal 500 16px/25px Poppins;
  font-size:2em;
  letter-spacing: 0px;
  color: #000;
}

.side-links:hover{
  text-decoration: none;
}

.content-box{
  border-top: 1.5px solid #c0c0c0;
  margin-top: -10px;
}

.side-navigation{
  background-color: #fff;
  opacity: 0.3;
  margin-top: 40px;
  display:block;
  height: 100%;
  margin-left: -40px;
}

.main-content{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  opacity: 1;
}

#navigation-bar{
  border-bottom: 3px solid #f00;
}

.a-active{
  font-weight: 600;
}

.logo-box{
  height: 70px;
  float: left;
  margin-top: 10px;
}

.logo{
  margin-top: 10px;
}

.logo-text{
  text-align: left;
  font: normal normal bold 28px/32px Helvetica;
  letter-spacing: 0px;
  color: #21455E;
  opacity: 1;
  float: right;
  font-size: 2em;
  padding-top: 20px;
  height: 70px;
  text-align: center;
  width: 159px;
  line-height: 40px;
  margin-left: -40px;
}
.top-links{
  text-align: left;
  font: normal normal normal 20px/27px Poppins;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
  margin: 0px 30px;
  height: 100px;
  display: flex;
  padding-top: 35px;
	justify-content: center;
}

</style>
