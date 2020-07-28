<template>
    <div :class="svgClass">
        <svg class="svg-icon"
            aria-hidden="true">
            <use :xlink:href="svgName" />
        </svg>
  </div>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        iconName: {
            type: String,
            required: true,
        },
        className: {
            type: String,
            default: '',
        },
    },
    computed: {
        svgName () {
            return `#icon-${this.iconName}`;
        },
        svgClass () {
            if (this.className) {
                return `clss ${this.className}`;
            }
            return 'clss';
        },
    },
};
</script>

<style scoped>
.clss {
    height: inherit;
    display: flex;
    align-items: center;
}
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
