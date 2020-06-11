<template>
  <div class="home">
    <Fullcalendar />
  </div>
</template>

<script>
// @ is an alias to /src
import Fullcalendar from "@/components/Fullcalendar.vue";

export default {
  name: "Home",
  components: {
    Fullcalendar
  }
};
</script>
