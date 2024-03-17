<template>
    <li class="nav-item">
        <select v-model="$i18n.locale" class="form-select">
            <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale.toUpperCase() }}</option>
        </select>             
    </li> 
</template>