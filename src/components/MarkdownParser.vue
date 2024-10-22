<template>
  <div class="markdown-content">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h2>{{ title }}</h2>
      <div v-html="parsedContent"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { marked } from 'marked';
import { useRoute } from 'vue-router';

export default {
  name: 'MarkdownParser',
  props: ['category', 'page'],
  setup(props) {
    const route = useRoute();
    const content = ref('');
    const title = ref('');
    const loading = ref(true);
    const error = ref(null);

    const parsedContent = computed(() => {
      return marked(content.value);
    });

    const loadContent = async (category, page) => {
      loading.value = true;
      error.value = null;
      try {
        let url;
        if (category && category !== 'root') {
          url = `/markdown/${category}/${page}.md`;
        } else {
          url = `/markdown/${page}.md`;
        }
        console.log('Attempting to load:', url);
        console.log('Category:', category, 'Page:', page);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        console.log('Loaded content:', text.substring(0, 100) + '...'); // 只显示前100个字符
        const lines = text.split('\n');
        if (lines[0].startsWith('# ')) {
          title.value = lines[0].substring(2);
          content.value = lines.slice(1).join('\n');
        } else {
          title.value = page;
          content.value = text;
        }
      } catch (e) {
        error.value = 'Error loading content: ' + e.message;
        console.error('Error details:', e);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      loadContent(props.category, props.page);
    });

    watch(() => [props.category, props.page], ([newCategory, newPage]) => {
      loadContent(newCategory, newPage);
    });

    return {
      title,
      parsedContent,
      loading,
      error
    };
  }
}
</script>

<style scoped>
.markdown-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

h2 {
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}
</style>
