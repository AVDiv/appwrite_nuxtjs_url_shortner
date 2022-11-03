<!-- Toggle Button -->
<script>
export default{
  props: ['placeholder', 'state', 'disabled'],
  emits: ['update:state'],
  methods:{
    sendState(e){
      this.$emit('state', e.target.checked);
    }
  }
}
</script>
<template>
  <div>
    <label for="default-toggle" class="inline-flex relative items-center cursor-pointer" >
      <input type="checkbox" :checked="state" v-on:change="$emit('update:state')" id="default-toggle" class="sr-only peer" :disabled='disabled'/>
      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:ease-in-out after:duration-1000 duration-500 shadow-inner shadow-[#00000035] after:shadow-md after:shadow-[#00000056] dark:border-gray-600 peer-checked:bg-blue-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"></div>
      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-400">{{ placeholder?placeholder:"" }}</span>
    </label>
  </div>
</template>