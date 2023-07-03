import { dotnet } from './dotnet.js'

let exportsPromise = null;

async function createRuntimeAndGetExports() {
    const { getAssemblyExports, getConfig } = await dotnet.create();
    const config = getConfig();
    return await getAssemblyExports(config.mainAssemblyName);
}

export async function evaluate(input, variables) {
    if (!exportsPromise) {
        exportsPromise = createRuntimeAndGetExports();
    }

    const exports = await exportsPromise;
    return exports.OctostacheWrapper.Evaluate(input, variables);
}