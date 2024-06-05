package com.sky.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(description = "客户登录时传递的数据模型")
public class GetMessageDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty("用户ID")
    private Integer id;

    @ApiModelProperty("消息ID")
    private Integer m_Id;

    @ApiModelProperty("种类")
    private Integer type;

    @ApiModelProperty("区间左端点")
    private Integer L;

    @ApiModelProperty("区间右端点")
    private Integer R;
}
