function EaseInOut(dx) 
{
    return dx < 0.5 ? 2 * dx * dx : -1 + (4 - 2 * dx) * dx;
}

function Interpolate(start, end, scale) {
    return (end - start) * scale + start;
}

function ScrollToNode(container, node, duration = 0)
{
    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const position = {
        x: nodeRect.left - containerRect.left + container.scrollLeft,
        y: nodeRect.top - containerRect.top + container.scrollTop,
    };

    ScrollTo(container, position, duration);
}

    
function ScrollTo(node, to, duration = 0) 
{
    const start = {
        x: node.scrollLeft,
        y: node.scrollTop
    };
    const change = {
        x: to.x - start.x,
        y: to.y - start.y
    };
    const beginTimePoint = performance.now();
    let now, elapsedTime, dx;

    if (duration == 0)
    {
        node.scrollLeft = start.x + change.x;
        node.scrollTop = start.y + change.y;
        return;
    }

    const Animate = () => {
        now = performance.now();
        elapsedTime = (now - beginTimePoint) / 1000;
        dx = (elapsedTime / duration);

        const scale = EaseInOut(dx);

        node.scrollLeft = start.x + change.x * scale;
        node.scrollTop = start.y + change.y * scale;

        if (dx < 1)
            requestAnimationFrame(Animate);
    };

    Animate();
}

function MoveHighlighter(toNode, duration = 0)
{
    const highlighterRect = Highlighter.getBoundingClientRect();
    const inputRect = Input.getBoundingClientRect();
    const GetToRect = () => toNode.getBoundingClientRect();

    const beginTimePoint = performance.now();
    let now, elapsedTime, dx;

    if (duration == 0)
    {
        Highlighter.style.left   = GetToRect().x + 'px';
        Highlighter.style.top    = GetToRect().y + 'px';
        Highlighter.style.width  = GetToRect().width + 'px';
        Highlighter.style.height = GetToRect().height + 'px';

        if (setting.mode.selected === 1)
        {
            Input.style.left = GetToRect().x + 'px';
            Input.style.top  = GetToRect().y + GetToRect().height + 2 + 'px';
        }
        return;
    }

    const Animate = () => {
        now = performance.now();
        elapsedTime = (now - beginTimePoint) / 1000;
        dx = (elapsedTime / duration);

        const scale = EaseInOut(dx);

        Highlighter.style.left   = Interpolate(highlighterRect.x, GetToRect().x, scale) + 'px';
        Highlighter.style.top    = Interpolate(highlighterRect.y, GetToRect().y, scale) + 'px';
        Highlighter.style.width  = Interpolate(highlighterRect.width, GetToRect().width, scale) + 'px';
        Highlighter.style.height = Interpolate(highlighterRect.height, GetToRect().height, scale) + 'px';

        if (setting.mode.selected === 1)
        {
            Input.style.left = Interpolate(highlighterRect.x, GetToRect().x, scale) + 'px';
            Input.style.top  = Interpolate(
                highlighterRect.y + highlighterRect.height,
                GetToRect().y + GetToRect().height, scale
            ) + 2 + 'px';
        }

        if (dx < 1)
            requestAnimationFrame(Animate);
    };

    Animate();
}
