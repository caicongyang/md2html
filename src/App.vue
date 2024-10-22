<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter();
const menuItems = ref([]);
let intervalId;

const loadMarkdownFiles = async () => {
  try {
    let data;
    if (import.meta.env.DEV) {
      // 开发环境：使用 markdown-files.json
      const response = await fetch('/markdown-files.json');
      if (!response.ok) {
        throw new Error('Failed to load markdown-files.json');
      }
      data = await response.json();
      menuItems.value = Object.entries(data).map(([category, files]) => ({
        category,
        items: files.map(file => ({
          name: file.replace('.md', ''),
          path: `/${category}/${file.replace('.md', '')}`
        }))
      }));
    } else {
      // 生产环境：使用 Nginx 的 autoindex
      const response = await fetch('/markdown');
      if (!response.ok) {
        throw new Error('Failed to load markdown files list');
      }
      data = await response.json();
      menuItems.value = Object.entries(data).reduce((acc, [name, details]) => {
        if (details.type === 'directory') {
          acc.push({
            category: name,
            items: details.files
              .filter(file => file.name.endsWith('.md'))
              .map(file => ({
                name: file.name.replace('.md', ''),
                path: `/${name}/${file.name.replace('.md', '')}`
              }))
          });
        }
        return acc;
      }, []);
    }
  } catch (error) {
    console.error('Error loading markdown files:', error);
  }
};

onMounted(() => {
  loadMarkdownFiles();
  // 每分钟检查一次更新
  intervalId = setInterval(loadMarkdownFiles, 60000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div id="app">
    <aside>
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        :router="true"
      >
        <el-menu-item index="/">
          <span>Home</span>
        </el-menu-item>
        <el-sub-menu v-for="item in menuItems" :key="item.category" :index="item.category">
          <template #title>
            <span>{{ item.category }}</span>
          </template>
          <el-menu-item v-for="subItem in item.items" :key="subItem.path" :index="subItem.path">
            {{ subItem.name }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}

aside {
  width: 200px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.el-menu {
  height: 100%;
}

main {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>
