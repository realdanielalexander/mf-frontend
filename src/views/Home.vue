<template>
    <section>
        <div class="columns" style="min-height: 100vh">
            <div class="column">
                <b-carousel
                    v-model="carousel"
                    :arrow-hover="true"
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
                            <div class="hero-body" :style="{ backgroundImage: 'url(' + require('../assets/carousel/'+ carousel.image +'.jpg') + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', paddingLeft: '60px' }">
                                <h1 class="title font" :style="{ marginBottom: 0, color: `${carousel.color}` }">{{ carousel.title.toUpperCase() }}</h1>
                                <h1 class="content font" :style="{ fontSize: '50px', fontWeight: 700, color: `${carousel.color}`}">{{ carousel.content.toUpperCase() }}</h1>
                                <b-button tag="router-link" to="/market" type="is-primary">SHOP NOW</b-button>
                            </div>
                        </section>
                    </b-carousel-item>
                </b-carousel>

                <div class="columns is-multiline is-vcentered" style="padding: 72px 72px">
                    <div class="column is-one-quarter has-text-centered">
                        <b-icon pack="fas" icon="gem" size="is-large">
                        </b-icon>
                        <p style="font-size: 25px"><strong>Unique Design</strong></p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer </p>
                    </div>

                    <div class="column is-one-quarter has-text-centered">
                        <b-icon pack="fas" icon="rocket" size="is-large">
                        </b-icon>
                        <p style="font-size: 25px"><strong>Service Innovation</strong></p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer </p>
                    </div>

                    <div class="column is-one-quarter has-text-centered">
                        <b-icon pack="fas" icon="desktop" size="is-large">
                        </b-icon>
                        <p style="font-size: 25px"><strong>Digital Strategy</strong></p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer </p>
                    </div>

                    <div class="column is-one-quarter has-text-centered">
                        <b-icon pack="fas" icon="pencil-alt" size="is-large">
                        </b-icon>
                        <p style="font-size: 25px"><strong>Brand Identity</strong></p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer </p>
                    </div>
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
            { title: "New Spring", content: "Arrivals sales", image: "carousel_1", color: "white" },
            { title: "New Summer", content: "Arrivals sales", image: "carousel_2", color: "black" },
            { title: "New Fall", content: "Arrivals sales", image: "carousel_3", color: "white" },
            { title: "New Winter", content: "Arrivals sales", image: "carousel_4", color: "black" },
            { title: "New Sales", content: "Get Better Style", image: "carousel_5", color: "white" },
            // { title: "Slide 6", content: "Arrivals sales", image: "carousel_6", color: "black" },
            // { title: "Slide 6", content: "Arrivals sales", image: "carousel_7", color: "black" },
        ],
    };
  },
  methods: {
    info(value) {
        this.carousel = value;
        // this.$buefy.toast.open({
        //     message: `This Slide ${value} !`,
        //     type: "is-info",
        // });
    },
  },
};
</script>

<style scoped>
.column {
    padding: 0
}

@media screen and (max-width: 667px) {
    .font {
        font-size: 25px !important;
    }

    .hero-body {
        padding-left: 24px !important;
    }
}

@media screen and (min-width: 668px) and (max-width: 1023px) {
    .font {
        font-size: 35px !important;
    }

    .hero-body {
        padding-left: 36px !important;
    }
}
</style>
