/**
 * Helper for checking for WebGL support.
 *
 * @memberof PIXI.utils
 * @function isWebGLSupported
 * @return {boolean} Is WebGL supported.
 */
export function isWebGLSupported()
{
    const contextOptions = { stencil: true, failIfMajorPerformanceCaveat: true };

    try
    {
        if (typeof WebGLRenderingContext === 'undefined')
        {
            return false;
        }

        let gl = getWebGLRenderingContext(contextOptions);

        const success = !!(gl && gl.getContextAttributes().stencil);

        if (gl)
        {
            const loseContext = gl.getExtension('WEBGL_lose_context');

            if (loseContext)
            {
                loseContext.loseContext();
            }
        }

        gl = null;

        return success;
    }
    catch (e)
    {
        return false;
    }
}

/**
 * @param {WebGLContextAttributes} contextOptions
 * @return {WebGLRenderingContext}
 */
function getWebGLRenderingContext(contextOptions) {
    const canvas = document.createElement('canvas');

    const gl = /** @type {WebGLRenderingContext} **/ (canvas.getContext('webgl', contextOptions)
        || canvas.getContext('experimental-webgl', contextOptions)
    );

    return gl;
}
