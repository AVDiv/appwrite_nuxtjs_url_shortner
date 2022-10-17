<script>
export default{
  head: {
    title: 'DEURL',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My custom description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  }
}
</script>
<template>
  <div>
    <!-- Logo -->
    <div class="w-full h-[15vh] flex justify-center">
      <img class="m-auto" src="/images/logos/logo.png" width="300" height="150"/>
    </div>
    <!-- URL shortener form -->
    <div>
      <form method="post" action="">
        
      </form>
    </div>
  </div>
</template>
