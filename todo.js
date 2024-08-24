export class Todo{
    description
    startTime
    endTime
    category
    status
    isDeleted

    constructor({
        description,
        startTime = new Date(),
        endTime = new Date(),
        category = null,
        status = "todo",
        isDeleted = false,
    }) {
        this.description = description
        this.startTime = startTime
        this.endTime = endTime
        this.category = category
        this.status = status
        this.isDeleted = isDeleted

        if (startTime > endTime) {
            throw new Error("待辦事項結束時間不可早於開始時間")
        }
    }

    changeStatus(status){
        this.changeStatusPreCondition(status)
        this.status = status
    }

    changeStatusPreCondition(status) {
        if (this.status == status) {
            throw new Error("狀態相同無法修改")
        }
        if (this.isDeleted) {
            throw new Error("已刪除的待辦事項無法修改")
        }
    }

    markAsDeleted(){
        this.isDeleted = true
    }

    changeTodo({
        startTime = this.startTime,
        endTime = this.endTime,
        description = this.description,
        category = this.category,
    }) {
        if (this.isDeleted) {
            throw new Error("已刪除的待辦事項無法修改")
        }
        this.startTime = startTime
        this.endTime = endTime
        this.description = description
        this.category = category
    }

}