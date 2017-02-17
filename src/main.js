(function(){
  const $ = e=>document.querySelector(e);
  const $$ = e=>document.querySelectorAll(e);
  const del = e=>{if(e) e.parentNode.removeChild(e);};
  const env = "development";

  const init = function(){
    const firebase = require("firebase");
    const Vue = require("../node_modules/vue/dist/vue.min.js");
    const VueRouter = require("../node_modules/vue-router/dist/vue-router.min.js");
    Vue.use(VueRouter);
    const app = require("./app");
    const routes = [
      {path: ""      , title: "TOP ", component: require("./pages/default")},
      {path: "/page1", title: "Page 1", component: require("./pages/page1")},
      {path: "/page2", title: "Page 2", component: require("./pages/page2")},
      {path: "/page3", title: "Page 3", component: require("./pages/page3")}
    ];
    const router = new VueRouter({routes});
    router.beforeEach((to, from, next) => {
      document.title = `${to.meta.title} - Jimdo Vue`;
      next();
    });

    firebase.initializeApp({
      apiKey: "AIzaSyBQ2AOFMsuLK_WXFxwsRDvQ3orXBAFqnuw",
      authDomain: "jimdo-vue.firebaseapp.com",
      databaseURL: "https://jimdo-vue.firebaseio.com",
      storageBucket: "jimdo-vue.appspot.com",
      messagingSenderId: "569483398438"
    });

    new Vue({
      router,
      template: require("./app"),
      created(){
        const s = document.createElement("style");
        s.innerText = require("./style");
        $("body").appendChild(s);
        $("body").style.margin = "0";
        $("html").style.height = "100%";
        $("body").style.height = "100%";
      }
    }).$mount("#app");
  }

  if(env == "development"){
    init();
  }else{
    window.addEventListener("load", ()=>{
      if(! ("isLoadedScript" in window) ){
        window.isLoadedScript = true;
        if(!$("#cc-eh")){
          del($("#loginbox"));
          del($("#loginbox-darklayer"));
          $("#cc-inner").setAttribute("class", "");
          $("body").childNodes[1].id = "app";
          $("body").setAttribute("id", "");
          $("body").setAttribute("class", "");
          $("body").setAttribute("style", "");
          for(let link of $$("link[rel='stylesheet']")){link.parentNode.removeChild(link);}
          init();
        }
      }
    });
  }
}());
