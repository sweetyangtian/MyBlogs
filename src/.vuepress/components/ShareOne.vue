<template>
    <div class="share-web-demo">
        <!-- H5 海报长图分享 -->
        <div class="share-content">
            <div class="name">渠道商务大客户销售 - 有道事业群704</div>
            <div class="sec-title">全职 / 产品 / 杭州市 / 3-5年 / 本科</div>
            <div class="title">职位描述</div>
            <div class="text">1、 参与网易游戏数据平台及相关数据产品的前端开发工作； 
                2、 参与具体需求的开发流程，与服务端开发、设计、产品人员沟通，保证产品的质量和开发进度； 
                3、 负责前端工程化建设，包括业务组件开发，性能优化，提升产品用户体验；
            </div>
            <div class="title">职位要求</div>
            <div class="text">1、计算机及相关专业本科以上学历，2年以上Web前端开发经验；
                2、精通Web前端相关技术(HTML/CSS/JavaScript/ES6等)，熟悉至少一个主流开发框架（react/vue/angular等）；
                3、热爱学习，关心新技术的发展，具有深入研究的兴趣和能力； 
                4、良好的沟通能力和团队合作精神
            </div>
            <div class="share-btns" @click="sharePoster">
                生成分享海报
            </div>
        </div>

        <div class="poster-container">
            <div class="shadow">
                <!-- 被复制的海报 -->
                <div id="share-poster" class="share-poster">
                    <img :src="largePosterBg1" alt="bg-header" class="header" @load="setLoaded('largePosterBg1')" />
                    <div class="container">
                        <div class="title">渠道商务大客户销售</div>
                        <div class="sec-title">全职 / 产品 / 杭州市 / 3-5年 / 本科</div>
                        <img :src="largePosterDesc" alt="desc" class="icon" @load="setLoaded('largePosterDesc')" />
                        <div class="text">1、 参与游戏数据平台及相关数据产品的前端开发工作；
                        2、 参与具体需求的开发流程，与服务端开发、设计、产品人员沟通，保证产品的质量和开发进度； 
                        3、 负责前端工程化建设，包括业务组件开发，性能优化，提升产品用户体验； 
                        </div>
                        <img :src="largePosterRequire" alt="require" class="icon" @load="setLoaded('largePosterRequire')" />
                        <div class="text">1、计算机及相关专业本科以上学历，2年以上Web前端开发经验；
                            
                        </div>
                    </div>
                    <img :src="largePosterBg2" alt="footer" class="footer" @load="setLoaded('largePosterBg2')" />
                </div>
            </div>

            <transition name="el-fade-in-linear">
                <!-- 复制成功的海报 -->
                <div v-show="isFinished" class="shadow">
                    <img :src="imgUrl" alt="海报生成失败了~请稍后再试!" />
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import html2canvas from "html2canvas";
import largePosterBg1 from "../public/largePosterBg1.png";
import largePosterBg2 from "../public/largePosterBg2.png";
import largePosterDesc from "../public/largePosterDesc.png";
import largePosterRequire from "../public/largePosterRequire.png";

// const DEFAULT_DPR = 2; // 手机端放大倍数

export default {
    data() {
        return {
            dynamicComponent: null,
            largePosterBg1,
            largePosterBg2,
            largePosterDesc,
            largePosterRequire,
            imgLoaded: {
                largePosterBg1: false,
                largePosterBg2: false,
                largePosterDesc: false,
                largePosterRequire: false
            },
            isAllCompleted: false,
            isFinished: false,
            imgUrl: ""
        };
    },
    mounted() {
        import('html2canvas').then(module => {
            Vue.use(module)
        }) 
        document.body.addEventListener("touchmove", this.scrollDisabled, { passive: false });
    },
    watch: {
        imgLoaded: {
            handler(val) {
                let resultList = Object.keys(val).map(key => val[key]);
                this.isAllCompleted = resultList.every(item => item);
            },
            deep: true
        },
        isFinished(val) {
            // 当海报生成后，清除滑动的禁止行为
            val && document.body.removeEventListener("touchmove", this.scrollDisabled, { passive: false });
        }
    },
    methods: {
        // 生成海报
        sharePoster() {
            this.isAllCompleted && this.drawCanvas(document.querySelector(".share-poster"));
        },
        drawCanvas(dom) {
            this.getBase64(dom).then(url => {
                this.isFinished = true;
                this.imgUrl = url;
            });
        },
        setLoaded(key) {
            this.imgLoaded[key] = true;
        },
        scrollDisabled(e) {
            e.preventDefault();
        },

        /**
         * @desc 根据dom节点，生成图片的Base64值
         * @param {HTML ELEMENT} dom dom节点
         *
         * @return {Promise String} 图片的Base64值
         */
        getBase64(dom) {
            let that = this;
            return new Promise((resolve, reject) => {
                if (!dom) return resolve("Convert to base64 failed!");
                let isIphone = navigator.userAgent.includes("iPhone");
                var opts = {
                    scale: 1 ,
					useCORS: true,
					x: document.getElementById('share-poster').offsetLeft,
                    y: document.getElementById('share-poster').offsetTop
					
                };

                html2canvas(dom, opts).then(canvas => {
					resolve(canvas.toDataURL())
				});
            });
        }
    },
    beforeDestroy() {
        document.body.removeEventListener("touchmove", this.scrollDisabled, { passive: false });
    }
};
</script>

<style lang="scss" scoped>
.share-web-demo {

    .share-content,.share-poster {
       white-space: pre-line;
		line-height: 2;
	
        .name {
            padding-bottom: 12px;
			font-size: 20px;
			color: #253044;
			font-weight: 700;
        }
		.sec-title{
			opacity: 0.65;
			font-size: 14px;
			color: #253044;
		}
		.title {
			padding: 12px 0;
			font-size: 18px;
			color: #253044;
			font-weight: 700;
		}
		.text{
			font-size: 14px;
			color: #333;
		}
		.share-btns {
			width: 80%;
			height: 40px;
			margin: 40px auto 20px;
			background: #E6231F;
			border-radius: 4px;
			color: #fff;
			font-size: 14px;
			line-height: 40px;
			text-align: center;
			white-space: normal;
			cursor: pointer;
		}
		.icon {
			display: block;
			height: 30px;
    		margin: 12px 0;
		}
    }

	.share-content {
 		width: 375px;
        margin-bottom:40px;
		padding: 20px;
		border: 1px solid #eee;
	}

    .poster-container {
        display: flex;
        justify-content: space-between;
    }
    .shadow{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        min-height: 900px;
    }
	.share-poster {
		width: 300px;
        
        // position: absolute;
        // top: 760px;
        // left: 0;

		.container {
			padding: 0 20px;
		}
	}

}
</style>
