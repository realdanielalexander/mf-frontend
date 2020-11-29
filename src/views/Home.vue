<template>
    <section>
        <div class="columns">
            <div class="column">
                <b-carousel
                    v-model="carousel"
                    :animated="animated"
                    :autoplay="true"
                    :pause-hover="true"
                    :pause-info="false"
                    :interval="3000"
                    :repeat="true"
                    @change="info($event)"
                >
                <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                    <section :class="`hero is-medium is-bold`">
                    <div class="hero-body" :style="{ backgroundImage: 'url(' + require('../assets/carousel/'+ carousel.image +'.jpg') + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }">
                        <h1 class="title" :style="{ marginBottom: 0, color: `${carousel.color}` }">{{ carousel.title.toUpperCase() }}</h1>
                        <h1 :style="{ fontSize: '50px', fontWeight: 700, color: `${carousel.color}`}">{{ carousel.content.toUpperCase() }}</h1>
                        <b-button type="is-primary">SHOP NOW</b-button>
                    </div>
                    </section>
                </b-carousel-item>
                </b-carousel>

                <div class="column" style="height: 100%">
                    <h1>asdwad</h1>
                    <h1>asdwad</h1>
                    <h1>asdwad</h1>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
        animated: "slide",
        carousel: 0,
        carousels: [
            { title: "New Summer", content: "Arrivals sales", image: "IU_3", color: "black" },
            { title: "New Spring", content: "Arrivals sales", image: "IU_4", color: "white" },
            { title: "Slide 3", content: "Arrivals sales", image: "IU_3", color: "black" },
            { title: "Slide 4", content: "Arrivals sales", image: "IU_4", color: "white" },
            { title: "Slide 5", content: "Arrivals sales", image: "IU_4", color: "white" },
            { title: "Slide 6", content: "Arrivals sales", image: "IU_3", color: "black" },
        ],
    };
  },
  methods: {
    info(value) {
      this.carousel = value;
      this.$buefy.toast.open({
        message: `This Slide ${value} !`,
        type: "is-info",
      });
    },
  },
};
</script>

<style scoped>
.column {
    padding: 0
}
</style>
