/**
* Compass Prompts - 灵感罗盘提示词
* 用于从小说数据中提取实体关系图谱
*/

/**
* 从架构数据提取完整图谱（基线快照）
*/
export const extractGraph = (params) => `你是JSON数据生成器。从以下内容提取人物关系，直接输出JSON，无任何额外文字。

角色体系：${params.characterDynamics?.substring(0, 2000) || '无'}
角色状态：${params.characterState?.substring(0, 1000) || '无'}
世界观：${params.worldBuilding?.substring(0, 1000) || '无'}

输出格式示例：
{"nodes":[{"id":"char_zhangsan","label":"张三","type":"character","importance":8,"faction":null,"status":"active","bio":"主角","traits":[],"firstAppearance":0}],"edges":[{"id":"edge_a_b","source":"char_zhangsan","target":"char_lisi","relationType":"alliance","label":"朋友","strength":7,"description":"好友","events":[]}]}

关系类型：hostile/romantic/alliance/neutral/family/mentor
importance和strength范围1-10。仅输出JSON。`

/**
* 从章节内容提取增量变更（delta）
*/
export const extractChapterDelta = (params) => `你是JSON生成器。分析章节变化，输出JSON格式的delta。

当前节点：${JSON.stringify(params.currentNodes?.map(n => ({id:n.id,label:n.label})) || [])}
当前关系：${JSON.stringify(params.currentEdges?.map(e => ({id:e.id,source:e.source,target:e.target})) || [])}

第${params.chapterNumber}章：${params.chapterText?.substring(0, 2000) || '无'}

输出格式：{"newNodes":[],"updatedNodes":[],"removedNodeIds":[],"newEdges":[],"updatedEdges":[],"removedEdgeIds":[]}

仅输出JSON，无额外文字。`

/**
* 逻辑审计 - 检测图谱中的逻辑不一致
*/
export const auditGraph = (params) => `你是JSON生成器。检查逻辑问题，输出JSON。

章节大纲：${params.chapterBlueprint?.substring(0, 500) || '无'}
图谱快照：${params.snapshotsText?.substring(0, 1000) || '无'}

输出格式：{"inconsistencies":[{"type":"dead_reappear","severity":"error","nodeIds":[],"edgeIds":[],"chapters":[],"message":"描述"}]}

severity: error/warning/info。仅输出JSON。`

/**
* 从单章内容提取完整关系图谱（用于章节写作面板内嵌图谱）
*/
export const extractChapterGraph = (params) => `你是JSON生成器。提取本章人物关系。

第${params.chapterNumber}章：${params.chapterText?.substring(0, 2000) || '无'}
角色状态：${params.characterState?.substring(0, 500) || '无'}

输出格式：{"nodes":[{"id":"char_xxx","label":"名字","type":"character","importance":5,"faction":null,"status":"active","bio":"简介"}],"edges":[{"source":"char_a","target":"char_b","relationType":"alliance","label":"关系","strength":5}]}

关系类型：hostile/romantic/alliance/neutral/family/mentor。仅输出JSON。`

export const compassPrompts = {
  extractGraph,
  extractChapterDelta,
  auditGraph,
  extractChapterGraph
}
