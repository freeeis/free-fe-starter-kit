<template>
  <div class="fixed-center text-center">
    <p>
      <q-icon
        name="not_interested"
        size="150px"
      ></q-icon>
    </p>
    <p class="text-faded">{{$t('error404')}}<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      to="/"
      :label="$t('goback')"
    />
  </div>
</template>

<script>
export default {
  name: 'ErrorPage404',
};
</script>
