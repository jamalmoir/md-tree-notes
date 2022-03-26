<script lang="ts">
    export let editMode

    let content = ""
    let parsedContent = ""

    function parseContent(content: string): string {
        let parsed = content;

        const rules = [
            // headings
            {regex: /^#####(.+?)[\r\n]/gm, template: '<h5 class="font-bold text-primary">$1</h5>'},
            {regex: /^####(.+?)[\r\n]/gm, template: '<h4 class="font-bold text-primary text-h4">$1</h4>'},
            {regex: /^###(.+?)[\r\n]/gm, template: '<h3 class="font-bold text-primary text-h3">$1</h3>'},
            {regex: /^##(.+?)[\r\n]/gm, template: '<h2 class="font-bold text-primary text-h2">$1</h2>'},
            {regex: /^#(.+?)[\r\n]/gm, template: '<h1 class="font-bold text-primary text-h1">$1</h1>'},

            // text decoration
            {regex: /\*\*(.+?)\*\*/g, template: '<bold class="font-bold">$1</bold>'},
            {regex: /\*(.+?)\*/g, template: '<i class="">$1</i>'},

            // links and images
            {regex: /\!\[(.+?)\]\((.+?)\)[\r\n]?/g, template: '<img class="text-primary" src="$2" alt="$1" width=250 height=250/>'},
            {regex: /\[(.+?)\]\((.+?)\)[\r\n]?/g, template: '<a class="text-primary" href="$2">$1</a>'},

            // lists
            {regex: /((?:\d\. .+[\n\r]?)+)/g, template: '<ol>$1</ol>'},
            {regex: /\d\. (.+[\n\r]?)/g, template: '<li>$1</li>'},
            {regex: /- (.+[\n\r]?)/g, template: '<li>$1</li>'},

            // code
            {regex: /```[\r\n]?((?:.+[\n\r]?)+?)```[\r\n]?/g, template: '<pre class="bg-neutral-dark text-white p-1">$1</pre>'},
            {regex: /`(.+?)`[\r\n]?/g, template: '<pre class="bg-black text-white p-1">$1</pre>'},

            //quotes
            {regex: /((?:> .+[\n\r]?)+)/g, template: '<blockquote class="pl-sm text-secondary-text border-l-2">$1</blockquote>'},
            {regex: /> (.+[\n\r]?)/g, template: '$1'},

            // misc
            {regex: /-{3,}[\r\n]?/g, template: '<hr class="my-xs"/>'},
            {regex: /[\r\n]/g, template: '<br />'},
        ]

        for (const rule of rules) {
            parsed = parsed.replace(rule.regex, rule.template)
        }

        return parsed
    }
    $: parsedContent = parseContent(content)
</script>

<div class="flex flex-row h-full">
    {#if editMode}
        <textarea class="w-full h-full p-xs overflow-y-auto resize-none" bind:value={content} autofocus />
    {/if}
    <div class="w-full h-full p-xs overflow-y-auto border-l-2 border-l-neutral-dark">
        {@html parsedContent }
    </div>
</div>
