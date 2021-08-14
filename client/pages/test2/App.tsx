import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const num = ref(0);
    const add = () => num.value++;

    return () => (
      <>
        <div>计数器</div>
        <div>{num.value}</div>
        <button type="button" onClick={add}>
          +1
        </button>
      </>
    );
  },
});
