<template>
<div class="card mb-4" @drop="handleDrop" @dragover.prevent>
    <!-- Background Image -->
    <img v-if="backgroundUrl" :src="backgroundUrl" class="img-fluid" alt="Background">

    <!-- Dropped Names -->
    <img
    v-for="(droppedName, index) in droppedNames"
    :key="index"
    :src="droppedName.imageUrl"
    :style="{ top: droppedName.y + 'px', left: droppedName.x + 'px', position: 'absolute' }"
    class="dropped-name"
    :alt="droppedName.label"
    draggable="true"
    @dragstart="handleDragStart(droppedName, $event)"
    />

    <!-- Name List -->
    <div class="name-list">
    <div
        v-for="(name, index) in names"
        :key="index"
        class="name-item card p-3 d-flex flex-row align-items-center"
    >
        <img
        :src="name.imageUrl"
        :alt="name.label"
        class="rounded-circle"
        draggable="true"
        @dragstart="handleDragStart(name, $event)"
        />
        <div>{{ name.label }}</div>
        <button class="btn btn-danger btn-sm ms-auto" @click="removeName(index)">Löschen</button>
    </div>
    </div>
</div>
</template>

<script>
export default {
props: {
    names: {
    type: Array,
    required: true
    },
    droppedNames: {
    type: Array,
    required: true
    },
    backgroundUrl: {
    type: String,
    default: ''
    }
},
methods: {
    handleDragStart(name, event) {
    event.dataTransfer.setData('nameLabel', name.label);
    },
    handleDrop(event) {
    const nameLabel = event.dataTransfer.getData('nameLabel');
    const x = event.offsetX;
    const y = event.offsetY;

    this.$emit('drop-name', { label: nameLabel, x, y });
    },
    removeName(index) {
    this.$emit('remove-name', index);
    }
}
};
</script>

<style scoped>
.dropped-name {
position: absolute;
max-width: 50px;
max-height: 50px;
border-radius: 50%;
}

.name-list {
margin-top: 20px;
}

.name-item {
display: flex;
align-items: center;
margin-bottom: 10px;
}

.name-item img {
margin-right: 10px;
max-width: 50px;
max-height: 50px;
}
</style>
