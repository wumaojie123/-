<template lang="html">
  <div class="page-container">
    <analysis-picker />
    <card-wrapper label="设备状况">
      abd
    </card-wrapper>
    <card-wrapper label="设备进货、出货量">
      abd
    </card-wrapper>
  </div>
</template>

<script>
import AnalysisPicker from '../components/AnalysisPicker/'
import CardWrapper from '../components/CardWrapper/'

export default {
  components: {
    AnalysisPicker,
    CardWrapper
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
}
</style>
