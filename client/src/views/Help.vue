<template>
    <div v-if="isDone" class="bg-gray">
        <div class="problem-group">
            <van-cell size="large" is-link :border="false"
                :title="$lang.help.problem"
                :value="$lang.help.problem_more"
                @click="handleToQuestionList">
            </van-cell>
            <div class="problem-items">
                <template v-for="(item, i) of problems">
                    <van-cell :key="i" size="large" is-link
                        title-class="the-ellipsis"
                        :title="item.title"
                        @click="handleLookDetail(item.question_id)">
                    </van-cell>
                </template>
            </div>
        </div>
        <div class="feedback-group">
            <van-cell size="large"
                required
                :title="$lang.help.feedback"
                :value="fieldLength"
                :border="false">
            </van-cell>
            <van-field v-model="feedback"
                type="textarea"
                maxlength="500"
                :border="false"
                :clearable="true"
                :autosize="{ maxHeight: 250, minHeight: 100 }"
                :placeholder="$lang.help.feedback_placeholder">
            </van-field>
            <div class="feedback-upload">
                <van-uploader v-model="filelist"
                    lazy-load
                    :max-count="3"
                    :after-read="afterRead"
                    :before-delete="beforeDelete">
                </van-uploader>
            </div>
        </div>
        <div class="help-contact">
            <van-field v-model="phone"
                size="large"
                required
                :label="$lang.help.contact"
                :placeholder="$lang.help.contact_placeholder">
            </van-field>
        </div>
        <div class="help-submit the-wall">
            <van-button type="info"
                size="large"
                round
                :loading="submitLoading"
                :disabled="couldBeSubmit"
                @click="handleSubmit">
                {{$lang.common.submitBtn}}
            </van-button>
        </div>
    </div>
</template>

<script>
import { Cell, Field, Uploader, Button } from 'vant';
import { feedbackCreate, upload } from '../api/request';
export default {
    components: {
        [Cell.name]: Cell,
        [Field.name]: Field,
        [Uploader.name]: Uploader,
        [Button.name]: Button,
    },
    computed: {
        fieldLength () {
            return `${this.feedback.length}/500`;
        },
        params () {
            return {
                content: this.feedback,
                contact: this.phone,
                img_ids: this.img_ids,
            };
        },
        couldBeSubmit () {
            return !(this.feedback && this.phone);
        },
        status () {
            return this.$store.state.status;
        },
        problems () {
            return this.$store.getters['help/fiveQuestion'];
        },
    },
    watch: {
        'status' () {
            this.isDone = true;
        },
    },
    created () {
        this.$store.commit('help/setPage', 1);
        this.$store.commit('help/setListNoConcat', []);
        this.$store.commit('help/setFinished', false);
        this.$store.dispatch('help/handleGetQuestionList');
    },
    data () {
        return {
            filelist: [],
            // problems: [],
            feedback: '',
            phone: '',
            img_ids: '',
            submitLoading: false,
            isDone: false,
        };
    },
    methods: {
        afterRead (file) {
            const uploadParams = {
                block: 'client',
                type: 'base64',
                file_content: file.content,
            };
            upload(uploadParams).then((res) => {
                if (this.img_ids) {
                    this.img_ids = `${this.img_ids},${res.data.file_id}`;
                } else {
                    this.img_ids = res.data.file_id;
                }
            })
                .catch(() => {
                    this.filelist.pop();
                });
        },
        beforeDelete (file) {
            this.filelist.forEach((item, index) => {
                if (item === file) {
                    let arr = this.img_ids.split(',');
                    arr.splice(index, 1);
                    this.img_ids = arr.join(',');
                }
            });
            return true;
        },
        handleSubmit () {
            this.submitLoading = true;
            feedbackCreate(this.params)
                .then(() => {
                    this.submitLoading = false;
                    this.$toast(this.$lang.common.submit_succ);
                    this.filelist = [];
                    this.img_ids = '';
                })
                .catch(() => {
                    this.submitLoading = false;
                });
        },
        handleLookDetail (qid) {
            this.$router.push({
                path: '/question-detail',
            });
            this.$store.dispatch('help/handleGetQuestionInfo', qid);
        },
        handleToQuestionList () {
            if (!this.problems.length) {
                this.$toast(this.$lang.help.no_more);
                return;
            }
            this.$router.push({
                path: '/questions',
            });
        },
    },
};
</script>

<style lang="less" scoped>
/deep/.van-cell__title {
    font-weight: 600;
}
.problem-group {
    margin-top: 10px;
}
.problem-items {
    /deep/.van-cell__title {
        color: #666;
        font-weight: normal;
    }
}
.feedback-group {
    margin-top: 10px;
    /deep/.van-cell__title {
        flex: none;
    }
    .feedback-upload {
        padding: @global_padding;
        padding-bottom: 5px;
        background-color: #ffffff;
    }
}
.help-contact {
    margin-top: 10px;
}
.help-submit {
    margin-top: 20px;
    padding-bottom: 30px;
}
</style>
