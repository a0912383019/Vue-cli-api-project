<template>
  <div>
    <nav>
      <router-link activeClass="myactive" to="/school/home">SchoolHome</router-link> |
      <router-link activeClass="myactive" to="/school/favor">SchoolFavor</router-link>
    </nav>
    <!-- <router-view v-if="!$route.meta.keepAlive" /> -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component v-if="$route.meta.keepAlive" :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
