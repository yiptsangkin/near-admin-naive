<script lang="ts" setup>
import { onMounted } from 'vue'

class Circle {
    x: number

    y: number

    r: number

    mx = 0

    my = 0

    ctx: CanvasRenderingContext2D

    color = {
        r: 0,
        g: 0,
        b: 0
    }

    stokeColor = {
        r: 0,
        g: 0,
        b: 0
    }

    constructor (
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        color: {
            r: 0,
            g: 0,
            b: 0
        },
        stokeColor: {
            r: 0,
            g: 0,
            b: 0
        }
    ) {
        this.x = x
        this.y = y
        this.r = Math.random() * 6
        this.mx = Math.random() * 2
        this.my = Math.random() * 2
        this.ctx = ctx
        this.color = color
        this.stokeColor = stokeColor
    }

    drawCircle () {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, 360)
        this.ctx.closePath()
        this.ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`
        this.ctx.fill()
    }

    drawLine (circle: Circle) {
        const dx = this.x - circle.x
        const dy = this.y - circle.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 150) {
            this.ctx.beginPath()
            this.ctx.moveTo(this.x, this.y)
            this.ctx.lineTo(circle.x, circle.y)
            this.ctx.closePath()
            this.ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${(150 - d) / 150})`
            this.ctx.stroke()
        }
    }

    move () {
        const w = this.ctx.canvas.clientWidth
        const h = this.ctx.canvas.clientHeight
        this.mx = (this.x < w && this.x > 0) ? this.mx : (-this.mx)
        this.my = (this.y < h && this.y > 0) ? this.my : (-this.my)
        this.x += this.mx / 2
        this.y += this.my / 2
    }
}

const circleNums = 60
let circleList: Circle[] = []
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D | null
let frameId: number

const initCircleList = () => {
    if (ctx) {
        const w = ctx.canvas.clientWidth
        const h = ctx.canvas.clientHeight
        for (let i = 0; i < circleNums; i += 1) {
            circleList.push(
                new Circle(Math.random() * w, Math.random() * h, ctx, {
                    r: 225,
                    g: 225,
                    b: 225,
                }, {
                    r: 225,
                    g: 225,
                    b: 225,
                })
            )
        }
    }
}

const drawCircle = () => {
    if (ctx) {
        const w = ctx.canvas.clientWidth
        const h = ctx.canvas.clientHeight
        ctx.clearRect(0, 0, w, h)
        for (let i = 0; i < circleList.length; i += 1) {
            circleList[i].move()
            circleList[i].drawCircle()
            for (let j = i + 1; j < circleList.length; j += 1) {
                circleList[i].drawLine(circleList[j])
            }
        }
        frameId = window.requestAnimationFrame(drawCircle)
    }
}

const createdAnimate = () => {
    circleList = []
    window.cancelAnimationFrame(frameId)
    canvas = document.getElementById('particles') as HTMLCanvasElement
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    ctx = canvas?.getContext('2d')
    if (ctx) {
        initCircleList()
        drawCircle()
    }
}

onMounted(() => {
    createdAnimate()
})

window.onresize = () => {
    createdAnimate()
}

</script>

<template>
    <canvas id="particles"></canvas>
</template>

<style lang="scss" scoped>
@import "~@csscss/particlebg";
</style>
