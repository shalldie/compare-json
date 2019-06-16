<template>
    <div class="json-mirror">
        <codemirror v-if="visible" ref="cm" style="height:auto;" :merge="true"
            :options="cmOption" @cursorActivity="onCmCursorActivity" @ready="onCmReady"
            @focus="onCmFocus" @blur="onCmBlur" @input="onCmInput" @scroll="onCmScroll" />
    </div>
</template>

<script>
import * as _ from '../common/utils';

// language
// import 'codemirror/mode/css/css.js';
// import 'codemirror/mode/xml/xml.js';
// import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/javascript/javascript.js';
// merge css
import 'codemirror/addon/merge/merge.css';
// merge js
import 'codemirror/addon/merge/merge.js';
// google DiffMatchPatch
import DiffMatchPatch from 'diff-match-patch';
// DiffMatchPatch config with global
window.diff_match_patch = DiffMatchPatch;
window.DIFF_DELETE = -1;
window.DIFF_INSERT = 1;
window.DIFF_EQUAL = 0;

export default {
    props: ['value'],
    data() {
        return {
            visible: false
        }
    },
    computed: {
        cmOption() {
            const [left, right] = this.value;
            return {
                value: left,
                origLeft: null,
                orig: right,
                connect: 'align',
                mode: {
                    name: 'javascript',
                    json: true
                },
                lineNumbers: true,
                collapseIdentical: false,
                highlightDifferences: true
            };
        }
    },
    mounted() {
        this.visible = true;
        window.ele = this;
    },
    methods: {
        handleChange() {
            // this.$emit('input', this.value);
        },
        onCmCursorActivity(a, b, c) {
            // console.log('onCmCursorActivity', a, b, c)
        },
        onCmReady(a, b, c) {
            // console.log('onCmReady', a, b, c)
            this.$refs.cm && this.$refs.cm.cminstance.refresh();
        },
        onCmFocus(a, b, c) {
            // console.log('onCmFocus', a, b, c)
        },
        onCmBlur(a, b, c) {
            // console.log('onCmBlur', a, b, c)
        },
        onCmInput(code) {
            // console.log('onCmInput', code)
        },
        onCmScroll() {
            // console.log('onCmScroll')
        }
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                this.visible = false;
                setTimeout(() => {
                    this.visible = true;
                }, 0);
                setTimeout(() => {
                    this.onCmReady();
                }, 100);
            }
        }
    }
};
</script>

<style lang="scss">
.CodeMirror-merge,
.CodeMirror {
    border: 1px solid #eee;
    height: auto !important;
}
.CodeMirror-scroll {
    height: auto !important;
    // overflow-y: hidden !important;
    overflow-x: auto !important;
}
</style>
