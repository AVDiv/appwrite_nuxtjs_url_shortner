<template>

</template>

<script>
export default {
  head: {
    title: 'Redirecting...',
    meta: [
      { charset: 'utf-8' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  async asyncData({ params, redirect }){
    let [data, status] = await fetch(`http://localhost:4000/api/url_details?name=${params.shortLink}`).then(async (res) => [await res.json(), res.status]);
    if (status === 200) {
      redirect(data.url);
    } else {
      redirect(`/error/${status}`);
    }
  },
}
</script>