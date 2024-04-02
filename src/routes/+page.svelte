<script>
    export let data;

    let code;
    let link;
    let msg;

    const handleSubmit = async() => {
        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({
                code: code,
                link: link
            })
        })

        const result = await response.json();

        if (result.status == 'success') {
            msg = `shorti-chi.vercel.app/${result.code}`;
            code = '';
            link = '';
        } else {
            msg = result.message;
        }
    }
</script>

<div class="w-screen h-screen flex items-center justify-center">

    <div class="container mx-auto">
        <h1 class="text-8xl font-black text-center py-8">SHORTI</h1>
        <div class="flex flex-col items-center justify-center p-4 gap-8">
            
            <div class="max-w-[600px] w-full">
                <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
                    <div class="flex flex-row gap-4">
                        <input type="text" name="code" bind:value={code} placeholder="Code..." class=" bg-[#403d39] p-2 rounded-md w-full shadow-xl">
                        <input type="text" name="link" bind:value={link} placeholder="Link..." class=" bg-[#403d39] p-2 rounded-md w-full shadow-xl">
                    </div>
                    <button type="submit" class="bg-[#403d39] hover:bg-[#33302d] p-2 rounded-md font-bold shadow-xl">CREATE SHORTI</button>
                </form>
            </div>
                {#if msg}
                    <div class="max-w-[600px] w-full bg-[#403d39] p-2 rounded-md shadow-xl">

                        <p class="text-center font-bold">{msg}</p>
                    </div>
                {/if}
            <div class="max-w-[600px] w-full bg-[#403d39] p-2 rounded-md shadow-xl">
                {#if data.recents.length == 0}
                    <p class="text-center font-bold">No recent shortis</p>
                {:else}
                    <table class="table-auto w-full text-center text-md">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Link</th>
                                <th>Clicks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each data.recents as item}
                                <tr>
                                    <td><p>{item.code}</p></td>
                                    <td><p>{item.link}</p></td>
                                    <td><p>{item.count}</p></td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {/if}
            </div>
        </div>
    </div>
</div>