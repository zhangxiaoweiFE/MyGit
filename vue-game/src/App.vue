<template>
    <div id="app">
        <router-view></router-view> 
    </div>

</template>

<script>

import Index from './components/Index'


export default {
    name: 'app',
    components:{Index}
}
</script>

<style>
    @import "/static/css/reset-min.css";
    @import "/static/css/style.css";
    @import "/static/css/exp.css";
    @import "/static/css/pay.css";
    @import "/static/css/lotto.css";
</style>
